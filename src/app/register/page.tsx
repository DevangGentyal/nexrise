// "use client"

// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!")
//       return
//     }
//     console.log("User Registered:", formData)
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 placeholder="Enter your full name"
//                 required
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Create a password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>
//             <Button type="submit" className="w-full">Sign Up</Button>
//           </form>
//           <p className="text-center text-sm text-muted-foreground mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="text-primary hover:underline">
//               Log in
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Register() {
    const [step, setStep] = useState(1);

    // Step 1 Fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Step 2 Fields
    const [username, setUsername] = useState("");
    const [niche, setNiche] = useState("");
    const [customNiche, setCustomNiche] = useState("");
    const [about, setAbout] = useState("");

    const [errors, setErrors] = useState({ name: "", email: "", password: "", username: "" });

    // Validation for Step 1
    const validateStep1 = () => {
        let valid = true;
        let newErrors = { name: "", email: "", password: "", username: "" };

        if (!/^[A-Za-z ]+$/.test(name)) {
            newErrors.name = "Name should only contain letters and spaces.";
            valid = false;
        }

        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            newErrors.email = "Enter a valid email address.";
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.password = "Passwords do not match.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Validation for Step 2
    const validateStep2 = () => {
        let valid = true;
        let newErrors = { username: "" };

        if (!/^[A-Za-z0-9_]+$/.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores.";
            valid = false;
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return valid;
    };

    // Handle Step 1 Next Button
    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep1()) {
            setStep(2);
        }
    };

    // Handle Final Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep2()) {
            const finalData = {
                name,
                email,
                password,
                username,
                niche: niche === "other" ? customNiche : niche,
            };
    
            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                });
    
                const data = await response.json();
                if (response.ok) {
                    alert("Registration Successful!");
                    window.location.href = "/";
                } else {
                    alert(`Error: ${data.error}`);
                }
            } catch (error) {
                console.error("Registration Error:", error);
            }
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                {step === 1 ? (
                    // Step 1: Basic Info
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                        <form onSubmit={handleNext} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <Button type="submit" className="w-full">Next</Button>
                        </form>
                    </>
                ) : (
                    // Step 2: Username, Niche, and About
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6">Create Your Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {/* <p className="text-sm text-gray-500">
                                    Username should:
                                    <ul className="list-disc ml-4">
                                        <li>Be unique</li>
                                        <li>Only contain letters, numbers, and underscores</li>
                                        <li>No spaces or special characters</li>
                                    </ul>
                                </p> */}
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            <div>
                                <Label htmlFor="niche">Select Your Niche</Label>
                                <Select onValueChange={(value) => setNiche(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose niche" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech">Tech</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="writing">Writing</SelectItem>
                                        <SelectItem value="gaming">Gaming</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Show custom niche input if "Other" is selected */}
                            {niche === "other" && (
                                <div>
                                    <Label htmlFor="custom-niche">Your Niche</Label>
                                    <Input
                                        id="custom-niche"
                                        type="text"
                                        placeholder="Enter your niche"
                                        value={customNiche}
                                        onChange={(e) => setCustomNiche(e.target.value)}
                                    />
                                </div>
                            )}

                            <div>
                                <Label htmlFor="about">Tell Us About Yourself</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Describe yourself..."
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

