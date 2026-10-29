import React, { forwardRef, type ReactNode } from "react";
import {
  Description,
  FieldError,
  InputGroup,
  Label,
  TextField,
  type InputProps,
  type InputRef,
} from "heroui-native";

export interface AppInputProps extends InputProps {
  /** Label text or custom element shown above the input */
  label?: ReactNode;

  /** Helper or explanatory text shown beneath the input */
  description?: ReactNode;

  /** Error message shown beneath the input when invalid */
  errorMessage?: ReactNode;

  /** Convenient alias for errorMessage */
  error?: ReactNode;

  /** Whether the field is required (shows asterisk on label) */
  isRequired?: boolean;

  /** Leading icon or content positioned inside the input */
  prefix?: ReactNode;

  /** Alias for prefix */
  leftContent?: ReactNode;

  /** Trailing icon or content positioned inside the input */
  suffix?: ReactNode;

  /** Alias for suffix */
  rightContent?: ReactNode;

  /**
   * When true, touches on prefix pass through to focus the input.
   * Default: true
   */
  isPrefixDecorative?: boolean;

  /**
   * When true, touches on suffix pass through to focus the input.
   * Default: false (allows interactive elements like buttons/icons)
   */
  isSuffixDecorative?: boolean;

  /** Tailwind / Uniwind class name applied to the outer TextField root container */
  containerClassName?: string;

  /** Tailwind / Uniwind class name applied to the InputGroup container */
  inputGroupClassName?: string;

  /** Tailwind / Uniwind class name applied to the Label component */
  labelClassName?: string;

  /** Tailwind / Uniwind class name applied to the Description component */
  descriptionClassName?: string;

  /** Tailwind / Uniwind class name applied to the FieldError component */
  errorClassName?: string;
}

export const AppInput = forwardRef<InputRef, AppInputProps>(
  (
    {
      label,
      description,
      errorMessage,
      error,
      isRequired = false,
      isDisabled = false,
      isInvalid: isInvalidProp,
      prefix,
      leftContent,
      suffix,
      rightContent,
      isPrefixDecorative = true,
      isSuffixDecorative = false,
      containerClassName,
      inputGroupClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      className,
      variant = "primary",
      ...textInputProps
    },
    ref
  ) => {
    const errorText = errorMessage ?? error;
    const isInvalid = Boolean(errorText) || Boolean(isInvalidProp);

    const leading = prefix ?? leftContent;
    const trailing = suffix ?? rightContent;

    return (
      <TextField
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={containerClassName}
      >
        {label ? <Label className={labelClassName}>{label}</Label> : null}

        <InputGroup isDisabled={isDisabled} className={inputGroupClassName}>
          {leading ? (
            <InputGroup.Prefix isDecorative={isPrefixDecorative}>{leading}</InputGroup.Prefix>
          ) : null}

          <InputGroup.Input
            ref={ref}
            variant={variant}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            className={className}
            {...textInputProps}
          />

          {trailing ? (
            <InputGroup.Suffix isDecorative={isSuffixDecorative}>{trailing}</InputGroup.Suffix>
          ) : null}
        </InputGroup>

        {description && !errorText ? (
          <Description className={descriptionClassName}>{description}</Description>
        ) : null}

        <FieldError className={errorClassName}>{errorText}</FieldError>
      </TextField>
    );
  }
);

AppInput.displayName = "AppInput";
