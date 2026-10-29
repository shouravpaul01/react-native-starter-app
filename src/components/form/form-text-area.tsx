import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppTextArea, type AppTextAreaProps } from "../inputs/app-text-area";

export type FormTextAreaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppTextAreaProps, "value" | "defaultValue" | "onChangeText" | "onBlur"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onChangeText?: (text: string) => void;
    /** Optional secondary blur callback */
    onBlur?: () => void;
  };

export function FormTextArea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormTextAreaProps<TFieldValues, TName>) {
  const {
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    disabled,
    onChangeText: userOnChangeText,
    onBlur: userOnBlur,
    ...appTextAreaProps
  } = props;

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
    <AppTextArea
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
      errorMessage={error?.message ?? appTextAreaProps.errorMessage ?? appTextAreaProps.error}
      isInvalid={Boolean(error) || Boolean(appTextAreaProps.isInvalid)}
      isDisabled={disabled ?? appTextAreaProps.isDisabled}
      {...appTextAreaProps}
    />
  );
}
