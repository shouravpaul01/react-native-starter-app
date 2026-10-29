import React, { forwardRef, type ReactNode } from "react";
import {
  Description,
  FieldError,
  Label,
  TextArea,
  TextField,
  type TextAreaProps,
  type TextAreaRef,
} from "heroui-native";

export interface AppTextAreaProps extends TextAreaProps {
  /** Label text or custom element shown above the text area */
  label?: ReactNode;

  /** Helper or explanatory text shown beneath the text area */
  description?: ReactNode;

  /** Error message shown beneath the text area when invalid */
  errorMessage?: ReactNode;

  /** Convenient alias for errorMessage */
  error?: ReactNode;

  /** Whether the field is required (shows asterisk on label) */
  isRequired?: boolean;

  /** Tailwind / Uniwind class name applied to the outer TextField root container */
  containerClassName?: string;

  /** Tailwind / Uniwind class name applied to the Label component */
  labelClassName?: string;

  /** Tailwind / Uniwind class name applied to the Description component */
  descriptionClassName?: string;

  /** Tailwind / Uniwind class name applied to the FieldError component */
  errorClassName?: string;
}

export const AppTextArea = forwardRef<TextAreaRef, AppTextAreaProps>(
  (
    {
      label,
      description,
      errorMessage,
      error,
      isRequired = false,
      isDisabled = false,
      isInvalid: isInvalidProp,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      className,
      variant = "primary",
      numberOfLines = 4,
      ...textAreaProps
    },
    ref
  ) => {
    const errorText = errorMessage ?? error;
    const isInvalid = Boolean(errorText) || Boolean(isInvalidProp);

    return (
      <TextField
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={containerClassName}
      >
        {label ? <Label className={labelClassName}>{label}</Label> : null}

        <TextArea
          ref={ref}
          variant={variant}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          numberOfLines={numberOfLines}
          className={className}
          {...textAreaProps}
        />

        {description && !errorText ? (
          <Description className={descriptionClassName}>{description}</Description>
        ) : null}

        <FieldError className={errorClassName}>{errorText}</FieldError>
      </TextField>
    );
  }
);

AppTextArea.displayName = "AppTextArea";
