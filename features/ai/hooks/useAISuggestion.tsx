import { useState, useRef, useCallback, useEffect } from "react";

interface AISuggestionState {
  suggestion: string | null;
  isLoading: boolean;
  position: { line: number; column: number } | null;
  decoration: string[];
  isEnabled: boolean;
}

interface UseAISuggestionReturn extends AISuggestionState {
  toggleEnabled: () => void;
  fetchSuggestion: (type: string, editor: any) => Promise<void>;
  acceptSuggestion: (editor: any, monaco: any) => void;
  rejectSuggestion: (editor: any) => void;
  clearSuggestion: (editor: any) => void;
}

export const useAISuggestion = (): UseAISuggestionReturn => {
  const [state, setState] = useState<AISuggestionState>({
    suggestion: null,
    isLoading: false,
    position: null,
    decoration: [],
    isEnabled: true,
  });

  // Refs for managing async operations
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isEnabledRef = useRef(true);

  // Sync isEnabled with ref
  useEffect(() => {
    isEnabledRef.current = state.isEnabled;
  }, [state.isEnabled]);

  const toggleEnabled = useCallback(() => {
    setState((prev) => {
      const newEnabled = !prev.isEnabled;
      console.log("AI suggestions:", newEnabled ? "enabled" : "disabled");
      return { ...prev, isEnabled: newEnabled };
    });
  }, []);

  const fetchSuggestion = useCallback(async (type: string, editor: any) => {
    if (!editor) {
      console.warn("Editor instance is not available.");
      return;
    }

    if (!isEnabledRef.current) {
      console.warn("AI suggestions are disabled.");
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Clear previous debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      const model = editor.getModel();
      const cursorPosition = editor.getPosition();

      if (!model || !cursorPosition) {
        console.warn("Editor model or cursor position is not available.");
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const payload = {
          fileContent: model.getValue(),
          cursorLine: cursorPosition.lineNumber - 1,
          cursorColumn: cursorPosition.column - 1,
          suggestionType: type,
        };

        const response = await fetch("/api/code-suggestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.suggestion) {
          setState((prev) => ({
            ...prev,
            suggestion: data.suggestion.trim(),
            position: {
              line: cursorPosition.lineNumber,
              column: cursorPosition.column,
            },
            isLoading: false,
          }));
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        console.error("Error fetching code suggestion:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }, 300);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const acceptSuggestion = useCallback((editor: any) => {
    setState((currentState) => {
      if (!editor || !currentState.suggestion) {
        return currentState;
      }

      // Only clear state - the actual insertion is done by playground-editor's
      // acceptCurrentSuggestion to prevent triple insertion (Monaco inline +
      // our Tab handler + this would have all inserted the same text)
      if (editor && currentState.decoration.length > 0) {
        editor.deltaDecorations(currentState.decoration, []);
      }

      return {
        ...currentState,
        suggestion: null,
        position: null,
        decoration: [],
      };
    });
  }, []);

  const rejectSuggestion = useCallback((editor: any) => {
    setState((currentState) => {
      if (editor && currentState.decoration.length > 0) {
        editor.deltaDecorations(currentState.decoration, []);
      }
      return {
        ...currentState,
        suggestion: null,
        position: null,
        decoration: [],
      };
    });
  }, []);

  const clearSuggestion = useCallback((editor: any) => {
    setState((currentState) => {
      if (editor && currentState.decoration.length > 0) {
        editor.deltaDecorations(currentState.decoration, []);
      }
      return {
        ...currentState,
        suggestion: null,
        position: null,
        decoration: [],
      };
    });
  }, []);

  return {
    ...state,
    toggleEnabled,
    fetchSuggestion,
    acceptSuggestion,
    rejectSuggestion,
    clearSuggestion,
  };
};