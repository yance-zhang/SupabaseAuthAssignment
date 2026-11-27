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

const signUpSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(6, "Password must have at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const [authError, setAuthError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setAuthError(null);
      setMessage(null);
      await signUp(data.email, data.password);
      setMessage(
        "Your account has been created. Check your email for a confirmation link.",
      );
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Sign up failed.");
    }
  };

  const field = (
    name: "email" | "password" | "confirmPassword",
    label: string,
    secure = false,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secure}
            autoCapitalize="none"
            keyboardType={name === "email" ? "email-address" : "default"}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message}</Text>
      )}
    </>
  );
  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Use email and password</Text>
        {field("email", "Email")}
        {field("password", "Password", true)}
        {field("confirmPassword", "Confirm password", true)}
        {authError && <Text style={styles.authError}>{authError}</Text>}
        {message && <Text style={styles.message}>{message}</Text>}

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </Pressable>
        <Pressable onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Already have an account? Sign in</Text>
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
  card: { backgroundColor: "white", padding: 24, borderRadius: 18, gap: 8 },
  title: { fontSize: 28, fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b", marginBottom: 8 },
  label: { fontWeight: "600", color: "#334155", marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 13,
  },
  error: { color: "#dc2626", fontSize: 12 },
  authError: {
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 8,
  },
  message: {
    color: "#166534",
    backgroundColor: "#dcfce7",
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
