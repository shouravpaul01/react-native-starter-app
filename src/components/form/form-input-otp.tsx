import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppInputOtp, type AppInputOtpProps } from "../inputs/app-input-otp";

export type FormInputOtpProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppInputOtpProps, "value" | "defaultValue" | "onChange" | "onBlur"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onChange?: (value: string) => void;
    /** Optional secondary blur callback */
    onBlur?: () => void;
  };

export function FormInputOtp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormInputOtpProps<TFieldValues, TName>) {
  const {
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    disabled,
    onChange: userOnChange,
    onBlur: userOnBlur,
    ...appInputOtpProps
  } = props;

  const {
    field: { onChange, onBlur, value },
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
    <AppInputOtp
      value={value !== undefined && value !== null ? String(value) : ""}
      onChange={(val) => {
        onChange(val);
        userOnChange?.(val);
      }}
      onBlur={() => {
        onBlur();
        userOnBlur?.();
      }}
      errorMessage={error?.message ?? appInputOtpProps.errorMessage ?? appInputOtpProps.error}
      isInvalid={Boolean(error) || Boolean(appInputOtpProps.isInvalid)}
      isDisabled={disabled ?? appInputOtpProps.isDisabled}
      {...appInputOtpProps}
    />
  );
}
