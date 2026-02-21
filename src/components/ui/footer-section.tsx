"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function Footerdemo() {
  return (
    <footer className="relative border-t border-white/10 bg-[#231f20] text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-10">
          <img src="/logo.svg" alt="SN Digital" className="h-7 brightness-0 invert" />
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block text-white/60 transition-colors hover:text-white">
                Home
              </a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">
                Our Process
              </a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">
                Who We Are
              </a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">
                Testimonials
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/60">
              <p>Groningen, Netherlands</p>
              <p>Email: contact@sndigital.eu</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white hover:bg-white/10">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white hover:bg-white/10">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.instagram.com/sndigitaleu" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white hover:bg-white/10">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white hover:bg-white/10">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-white/40">
            © 2026 SN Digital. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
