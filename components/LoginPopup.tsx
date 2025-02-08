"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPopup() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="sm">Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle className="text-center">Login</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <Button variant="default" className="w-full">Login</Button>

                    {/* Links for Forgot Password & Register */}
                    <div className="text-sm text-center text-muted-foreground">
                        <Link href="/forgot-password" className="hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline" onClick={() => setOpen(false)}>
                            Register
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
