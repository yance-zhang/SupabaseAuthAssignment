import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(6, "Password must have at least 6 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;


export default function LoginScreen() {
    const { signIn } = useAuth();
    const [authError, setAuthError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setAuthError(null);
            await signIn(data.email, data.password);
        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Sign in failed.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="student@example.com"
                        />
                    )}
                />
                {errors.email && (
                    <Text style={styles.error}>{errors.email.message}</Text>
                )}
                <Text style={styles.label}>Password</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry
                            placeholder="At least 6 characters"
                        />
                    )}
                />
                {errors.password && (
                    <Text style={styles.error}>{errors.password.message}</Text>
                )}
                {authError && <Text style={styles.authError}>{authError}</Text>}
                <Pressable
                    style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    disabled={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </Pressable>
                <Pressable onPress={() => router.replace("/signup")}>
                    <Text style={styles.link}>Do not have an account? Sign up</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f1f5f9",
    },
    card: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 18,
        gap: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0f172a",
    },
    subtitle: {
        color: "#64748b",
        marginBottom: 12,
    },
    label: {
        fontWeight: "600",
        color: "#334155",
        marginTop: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 10,
        padding: 13,
        backgroundColor: "#fff",
    },
    error: { color: "#dc2626", fontSize: 12 },
    authError: {
        color: "#b91c1c",
        backgroundColor: "#fee2e2",
        padding: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: { opacity: 0.65 },
    buttonText: { color: "white", fontWeight: "700" },
    link: {
        color: "#2563eb",
        textAlign: "center",
        marginTop: 12,
        fontWeight: "600",
    },
});
