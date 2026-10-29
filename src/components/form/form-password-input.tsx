import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppPasswordInput, type AppPasswordInputProps } from "../inputs/app-password-input";

export type FormPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppPasswordInputProps, "value" | "defaultValue" | "onChangeText" | "onBlur"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onChangeText?: (text: string) => void;
    /** Optional secondary blur callback */
    onBlur?: () => void;
  };

export function FormPasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  onChangeText: userOnChangeText,
  onBlur: userOnBlur,
  ...passwordProps
}: FormPasswordInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    disabled,
  });

  return (
    <AppPasswordInput
      ref={ref}
      value={value !== undefined && value !== null ? String(value) : ""}
      onChangeText={(text) => {
        onChange(text);
        userOnChangeText?.(text);
      }}
      onBlur={() => {
        onBlur();
        userOnBlur?.();
      }}
      errorMessage={error?.message ?? passwordProps.errorMessage ?? passwordProps.error}
      isInvalid={Boolean(error) || Boolean(passwordProps.isInvalid)}
      isDisabled={disabled ?? passwordProps.isDisabled}
      {...passwordProps}
    />
  );
}
