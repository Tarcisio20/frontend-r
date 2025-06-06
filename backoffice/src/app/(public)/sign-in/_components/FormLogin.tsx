"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import theme from "@/lib/theme";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../_services/_service";
import LoadingScreen from "@/components/Loading";
import { getHttpErrorMessage } from "@/utils/http-erros";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


export const FormLogin = () => {

    const router = useRouter()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (username === "" || password === "") {
            toast.error("Por favor, preencha todos os campos.");
            return;
        }
        const user = await login({ username, password });
        if (user.status !== 200) {
            toast.error(getHttpErrorMessage(user.status as number));
            setLoading(false);
            return;
        }
        if (user.status === 200) {

           // cookies e tokene 
            Cookies.set("tokenRV2_admin", user.data.access, { expires: 1 }); // Expira em 7 dias


            toast.success("Login realizado com sucesso!");
            router.push('/backoffice/');
            setLoading(false);
            return
        }
        setLoading(false);
    };

    return (
        <Card className="w-full max-w-sm shadow-2xl" style={{ backgroundColor: theme.colors["color-bg-pages"] }}>
            <CardHeader className="flex flex-col items-center gap-4 mb-5">
                <CardTitle>
                    <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Usuario</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Digite o seu usuário"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border-2 outline-none"
                                style={{ borderColor: theme.colors["color-secondary"] }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Senha</Label>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*********"
                                    className="border-2 pr-10 outline-none"
                                    style={{ borderColor: theme.colors["color-secondary"] }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col gap-4 mt-6">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full cursor-pointer"
                            style={{ backgroundColor: theme.colors["color-tertiary"] }}
                        >
                            Entrar
                        </Button>
                        <Button variant="link" className="w-full text-gray-500">
                            Esqueceu a senha: clique aqui!
                        </Button>
                    </div>
                </form>
            </CardContent>
            {loading &&
                <LoadingScreen />
            }
        </Card>
    );
};
