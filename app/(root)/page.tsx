"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code2, Sparkles, Zap, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Add 'as const' to fix the easing type errors
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-12">
      
      {/* Hero Section */}
      <motion.div
        className="flex flex-col justify-center items-center text-center px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E93F3F] to-[#C53030] rounded-2xl blur-3xl opacity-20 animate-pulse" />
          <Image
            src="/header-logo.png"
            alt="AI Code Editor Interface"
            height={400}
            width={400}
            className="relative z-10 drop-shadow-2xl animate-float"
            priority
          />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-5xl"
        >
          {/* Red gradient text */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E93F3F] via-[#C53030] to-[#F56565] dark:from-[#E93F3F] dark:via-[#C53030] dark:to-[#F56565]">
            Code Smarter
          </span>
          <br />
          <span className="text-foreground">with AI Intelligence</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          VibeCode Editor transforms your coding experience with intelligent autocomplete,
          real-time debugging, and seamless collaboration powered by advanced AI.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="group bg-[#E93F3F] hover:bg-[#C53030]">
              Start Coding Free
              <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="group">
            <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            View Demo
          </Button>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="w-full max-w-6xl mt-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={fadeInUp}
            className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2"
          >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#E93F3F] to-[#C53030] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              AI-powered autocomplete that predicts your next move, reducing boilerplate by 70%.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2"
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#F56565] to-[#E93F3F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent Debugging</h3>
            <p className="text-muted-foreground">
              Real-time error detection and AI-suggested fixes before you even run your code.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2"
          >
            {/* Darker red gradient */}
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#C53030] to-[#A02020] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborate Live</h3>
            <p className="text-muted-foreground">
              Share sessions with teammates, with AI assistance for pair programming.
            </p>
          </motion.div>
        </div>
      </motion.div>

        {/* Code Preview Section */}
      <motion.div
        className="w-full max-w-5xl mt-24 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
      >
        <div className="rounded-2xl border bg-card p-1 shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-muted-foreground">AI Assistant</span>
          </div>
          {/* Dark red theme background */}
          <div className="p-6 font-mono text-sm bg-gradient-to-br from-[#1a0a0a]/50 to-[#2c0c0c]/50 rounded-b-2xl">
            <div className="flex gap-2 mb-2">
              <span className="text-green-400">// AI suggests:</span>
            </div>
            <div className="flex gap-2">
              {/* Orange for keywords to complement red theme */}
              <span className="text-orange-400">const</span>
              <span className="text-white">optimizedFunction</span>
              <span className="text-orange-400">=</span>
              <span className="text-white">()</span>
              <span className="text-orange-400">=&gt;</span>
              <span className="text-white">{`{`}</span>
            </div>
            <div className="flex gap-2 pl-4">
              <span className="text-muted-foreground">// Your code here...</span>
            </div>
            <span className="text-white">{`}`};</span>
          </div>
        </div>
      </motion.div>

         {/* CTA Section */}
      <motion.div
        className="mt-24 mb-12 px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        {/* Red gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E93F3F] to-[#C53030] px-8 py-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            {/* Warm text color for red background */}
            <p className="text-red-100 mb-8 text-lg">
              Join thousands of developers who are already coding smarter with AI.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Get Started Now
              </Button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-white/10 blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}