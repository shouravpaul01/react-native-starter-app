import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppRadioGroup, type AppRadioGroupProps } from "../inputs/app-radio-group";

export type FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppRadioGroupProps, "value" | "defaultValue" | "onValueChange"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onValueChange?: (value: string) => void;
  };

export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormRadioGroupProps<TFieldValues, TName>) {
  const {
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    disabled,
    onValueChange: userOnValueChange,
    ...appRadioGroupProps
  } = props;

  const {
    field: { onChange, value },
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
    <AppRadioGroup
      value={value !== undefined && value !== null ? String(value) : undefined}
      onValueChange={(val) => {
        onChange(val);
        userOnValueChange?.(val);
      }}
      errorMessage={error?.message ?? appRadioGroupProps.errorMessage ?? appRadioGroupProps.error}
      isInvalid={Boolean(error) || Boolean(appRadioGroupProps.isInvalid)}
      isDisabled={disabled ?? appRadioGroupProps.isDisabled}
      {...appRadioGroupProps}
    />
  );
}
