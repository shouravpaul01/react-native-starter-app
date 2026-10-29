import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppInput, type AppInputProps } from "../inputs/app-input";

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppInputProps, "value" | "defaultValue" | "onChangeText" | "onBlur"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onChangeText?: (text: string) => void;
    /** Optional secondary blur callback */
    onBlur?: () => void;
  };

export function FormInput<
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
  ...appInputProps
}: FormInputProps<TFieldValues, TName>) {
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
    <AppInput
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
      errorMessage={error?.message ?? appInputProps.errorMessage ?? appInputProps.error}
      isInvalid={Boolean(error) || Boolean(appInputProps.isInvalid)}
      isDisabled={disabled ?? appInputProps.isDisabled}
      {...appInputProps}
    />
  );
}
