import React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { AppCheckbox, type AppCheckboxProps } from "../inputs/app-checkbox";

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<AppCheckboxProps, "isSelected" | "defaultSelected" | "onSelectedChange"> & {
    /** Optional secondary change callback if needed alongside React Hook Form */
    onSelectedChange?: (isSelected: boolean) => void;
  };

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormCheckboxProps<TFieldValues, TName>) {
  const {
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
    disabled,
    onSelectedChange: userOnSelectedChange,
    ...appCheckboxProps
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
    <AppCheckbox
      isSelected={Boolean(value)}
      onSelectedChange={(checked) => {
        onChange(checked);
        userOnSelectedChange?.(checked);
      }}
      errorMessage={error?.message ?? appCheckboxProps.errorMessage ?? appCheckboxProps.error}
      isInvalid={Boolean(error) || Boolean(appCheckboxProps.isInvalid)}
      isDisabled={disabled ?? appCheckboxProps.isDisabled}
      {...appCheckboxProps}
    />
  );
}
