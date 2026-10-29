import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Typography, useThemeColor } from "heroui-native";
import type { JSX } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { z } from "zod";

import { FormInput } from "@/components/form/form-input";
import { FormInputOtp } from "@/components/form/form-input-otp";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { FormTextArea } from "@/components/form/form-text-area";
import { Lock, Mail, User } from "lucide-react-native";

function HeroUILogo({ tintColor }: { tintColor: string }): JSX.Element {
  return (
    <Svg width={90} height={30} viewBox="0 0 140 44" fill="none">
      <Path
        d="M0.677734 11.3847V24.0405C0.677734 24.6387 0.985209 25.1946 1.49107 25.5109L10.1195 30.9067C11.2693 31.6257 12.7586 30.796 12.7586 29.4363V18.7981C12.7586 18.186 13.0803 17.6194 13.605 17.3074L18.8683 14.1785V41.4437C18.8683 42.7988 20.3486 43.6293 21.4988 42.9195L30.4044 37.4229C30.9152 37.1076 31.2264 36.549 31.2264 35.9471V9.76484C31.2264 8.41634 29.759 7.58483 28.6085 8.28139L18.8683 14.1785V2.55643C18.8683 1.21158 17.408 0.379537 16.2574 1.06878L1.51927 9.89703C0.997365 10.2097 0.677734 10.7747 0.677734 11.3847Z"
        fill={tintColor}
      />
      <Path
        d="M63.8763 24.0707C63.8763 20.4817 62.4078 18.8253 59.4709 18.8253C56.1076 18.8253 53.7391 21.0799 53.7391 26.1412V37.7363H47.6756V5.52769H53.7391V17.3069C55.2075 14.9142 57.6234 13.7179 60.9394 13.7179C66.5764 13.7179 69.8924 17.1688 69.8924 22.9664V37.7363H63.8763V24.0707Z"
        fill={tintColor}
      />
      <Path
        d="M84.8996 38.4725C77.3677 38.4725 72.5832 33.5952 72.5832 26.0952C72.5832 18.6872 77.3203 13.7179 84.8996 13.7179C93.0947 13.7179 97.5475 19.5154 96.3158 27.6596H78.6467C78.9783 31.5247 81.252 33.7333 84.8996 33.7333C87.8839 33.7333 89.684 32.2149 90.1577 30.6964H96.1737C95.2263 35.2057 91.0577 38.4725 84.8996 38.4725ZM78.7888 23.6566H90.4419C90.3945 20.4817 88.3102 18.3191 84.7574 18.3191C81.5836 18.3191 79.3572 20.1596 78.7888 23.6566Z"
        fill={tintColor}
      />
      <Path
        d="M99.6225 20.3437C99.6225 16.5246 101.754 14.4541 105.828 14.4541H113.597V19.4234H105.686V37.7363H99.6225V20.3437Z"
        fill={tintColor}
      />
      <Path
        d="M126.863 38.4725C119.189 38.4725 114.31 33.5492 114.31 26.0952C114.31 18.6412 119.189 13.7179 126.863 13.7179C134.442 13.7179 139.322 18.6412 139.322 26.0952C139.322 33.5492 134.442 38.4725 126.863 38.4725ZM126.863 33.4572C130.653 33.4572 133.163 30.5584 133.163 26.0952C133.163 21.632 130.653 18.6872 126.863 18.6872C123.026 18.6872 120.515 21.632 120.515 26.0952C120.515 30.5584 123.026 33.4572 126.863 33.4572Z"
        fill={tintColor}
      />
    </Svg>
  );
}

// ----------------------------------------------------
// 1. Zod Validation Schema
// ----------------------------------------------------
const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(3, "Name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers")
    .optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function HomeScreen(): JSX.Element {
  const foregroundColor = useThemeColor("foreground");
  const iconColor = useThemeColor("muted");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------
  // 2. React Hook Form Setup with Zod Resolver
  // --------------------------------------------------
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      bio: "",
      otp: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting: formIsSubmitting },
  } = methods;

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Registration Successful! 🎉",
        `Welcome, ${data.fullName}!\nEmail: ${data.email}`,
        [
          {
            text: "Reset Form",
            onPress: () => reset(),
          },
          { text: "OK" },
        ]
      );
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-12"
      >
        <Card className="p-6 gap-6 shadow-sm">
          {/* Header */}
          <View className="items-center gap-2">
            <HeroUILogo tintColor={foregroundColor} />
            <Typography.Heading className="text-xl font-bold mt-2 text-center">
              Create an Account
            </Typography.Heading>
            <Typography.Paragraph className="text-sm text-center text-muted">
              Built with HeroUI Native InputGroup, React Hook Form, and Zod
            </Typography.Paragraph>
          </View>

          {/* Form Context Provider */}
          <FormProvider {...methods}>
            <View className="gap-4">
              {/* Full Name Field */}
              <FormInput
                name="fullName"
                label="Full Name"
                placeholder="e.g. John Doe"
                isRequired
                prefix={<User size={18} color={iconColor} />}
                autoCapitalize="words"
              />

              {/* Email Field */}
              <FormInput
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                isRequired
                prefix={<Mail size={18} color={iconColor} />}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Password Field with built-in toggle */}
              <FormPasswordInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                isRequired
                prefix={<Lock size={18} color={iconColor} />}
                description="At least 6 characters with 1 uppercase & 1 number"
                autoCapitalize="none"
              />

              {/* Bio / Message TextArea Field */}
              <FormTextArea
                name="bio"
                label="Bio"
                placeholder="Tell us a little about yourself..."
                description="Optional, maximum 200 characters"
                numberOfLines={3}
              />

              {/* OTP Input Field */}
              <FormInputOtp
                name="otp"
                label="Verification Code (OTP)"
                description="Enter the 6-digit code sent to your email"
                maxLength={6}
              />
            </View>

            {/* Submit Button */}
            <Button
              className="w-full mt-2"
              isDisabled={isSubmitting || formIsSubmitting}
              onPress={() => void handleSubmit(onSubmit)()}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </FormProvider>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
