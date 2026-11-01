import React, { forwardRef, type ComponentRef, type ReactNode } from "react";
import {
  Checkbox,
  ControlField,
  Description,
  FieldError,
  Label,
  type CheckboxProps,
} from "heroui-native";
import { Pressable, View } from "react-native";

export interface AppCheckboxProps {
  /** Label text or custom element shown alongside the checkbox */
  label?: ReactNode;

  /** Helper or explanatory text shown beneath the label */
  description?: ReactNode;

  /** Error message shown beneath the checkbox when invalid */
  errorMessage?: ReactNode;

  /** Convenient alias for errorMessage */
  error?: ReactNode;

  /** Whether the field is required (shows asterisk on label) */
  isRequired?: boolean;

  /** Whether the checkbox is currently selected/checked */
  isSelected?: boolean;

  /** Callback fired when selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;

  /** Whether the checkbox is disabled */
  isDisabled?: boolean;

  /** Whether the checkbox is in an invalid error state */
  isInvalid?: boolean;

  /**
   * Position of the checkbox relative to the label.
   * - "start": Checkbox on the left, label on the right (default)
   * - "end": Label on the left, checkbox on the right
   * @default "start"
   */
  checkboxPlacement?: "start" | "end";

  /** Visual variant: primary or secondary @default "primary" */
  variant?: "primary" | "secondary";

  /** Custom child content to display inside the label area */
  children?: ReactNode;

  /** Additional props forwarded directly to the Checkbox component */
  checkboxProps?: Partial<CheckboxProps>;

  /** Tailwind / Uniwind class name applied to the outer container / ControlField root */
  containerClassName?: string;

  /** Tailwind / Uniwind class name applied to the row containing the checkbox and label */
  rowClassName?: string;

  /** Tailwind / Uniwind class name applied to the checkbox element */
  checkboxClassName?: string;

  /** Tailwind / Uniwind class name applied to the Label component */
  labelClassName?: string;

  /** Tailwind / Uniwind class name applied to the Description component */
  descriptionClassName?: string;

  /** Tailwind / Uniwind class name applied to the FieldError component */
  errorClassName?: string;
}

export type AppCheckboxRef = ComponentRef<typeof Pressable>;

export const AppCheckbox = forwardRef<AppCheckboxRef, AppCheckboxProps>(
  (
    {
      label,
      description,
      errorMessage,
      error,
      isRequired = false,
      isSelected = false,
      onSelectedChange,
      isDisabled = false,
      isInvalid: isInvalidProp,
      checkboxPlacement = "start",
      variant = "primary",
      children,
      checkboxProps,
      containerClassName,
      rowClassName,
      checkboxClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
    },
    ref
  ) => {
    const errorText = errorMessage ?? error;
    const isInvalid = Boolean(errorText) || Boolean(isInvalidProp);

    // Standalone Checkbox (when no label, description, or custom children)
    if (!label && !description && !children) {
      return (
        <View className={containerClassName}>
          <Checkbox
            ref={ref}
            isSelected={isSelected}
            onSelectedChange={onSelectedChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            variant={variant}
            className={checkboxClassName}
            {...checkboxProps}
          />
          <FieldError className={errorClassName}>{errorText}</FieldError>
        </View>
      );
    }

    // Full interactive Row with Label, Description, and Checkbox
    return (
      <ControlField
        ref={ref}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        className={
          containerClassName
            ? `flex-col items-start gap-1.5 ${containerClassName}`
            : "flex-col items-start gap-1.5"
        }
      >
        <View
          className={
            rowClassName
              ? `flex-row items-center gap-3 w-full ${rowClassName}`
              : "flex-row items-center gap-3 w-full"
          }
        >
          {checkboxPlacement === "start" && (
            <ControlField.Indicator
              variant="checkbox"
              pointerEvents="none"
              className={checkboxClassName}
            >
              <Checkbox
                variant={variant}
                isSelected={isSelected}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                {...checkboxProps}
              />
            </ControlField.Indicator>
          )}

          <View className="flex-1">
            {label ? (
              <Label isRequired={isRequired} className={labelClassName}>
                {label}
              </Label>
            ) : null}
            {description ? (
              <Description className={descriptionClassName}>{description}</Description>
            ) : null}
            {children}
          </View>

          {checkboxPlacement === "end" && (
            <ControlField.Indicator
              variant="checkbox"
              pointerEvents="none"
              className={checkboxClassName}
            >
              <Checkbox
                variant={variant}
                isSelected={isSelected}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                {...checkboxProps}
              />
            </ControlField.Indicator>
          )}
        </View>

        <View pointerEvents="none">
          <FieldError className={errorClassName}>{errorText}</FieldError>
        </View>
      </ControlField>
    );
  }
);

AppCheckbox.displayName = "AppCheckbox";
