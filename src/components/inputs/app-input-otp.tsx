import React, { forwardRef, type ReactNode } from "react";
import {
  Description,
  FieldError,
  InputOTP,
  Label,
  REGEXP_ONLY_DIGITS,
  TextField,
  type InputOTPRef,
  type InputOTPRootProps,
} from "heroui-native";

export interface AppInputOtpProps extends Omit<InputOTPRootProps, "children"> {
  /** Label text or custom element shown above the OTP input */
  label?: ReactNode;

  /** Helper or explanatory text shown beneath the OTP input */
  description?: ReactNode;

  /** Error message shown beneath the OTP input when invalid */
  errorMessage?: ReactNode;

  /** Convenient alias for errorMessage */
  error?: ReactNode;

  /** Whether the field is required (shows asterisk on label) */
  isRequired?: boolean;

  /**
   * Custom slot layout children.
   * If omitted, slots will be auto-generated according to maxLength.
   */
  children?: ReactNode;

  /**
   * Whether to display a middle separator for 6-digit OTPs.
   * Default: true when maxLength === 6, false otherwise.
   */
  showSeparator?: boolean;

  /** Tailwind / Uniwind class name applied to the outer TextField root container */
  containerClassName?: string;

  /** Tailwind / Uniwind class name applied to the Label component */
  labelClassName?: string;

  /** Tailwind / Uniwind class name applied to the Description component */
  descriptionClassName?: string;

  /** Tailwind / Uniwind class name applied to the FieldError component */
  errorClassName?: string;
}

export const AppInputOtp = forwardRef<InputOTPRef, AppInputOtpProps>(
  (
    {
      label,
      description,
      errorMessage,
      error,
      isRequired = false,
      isDisabled = false,
      isInvalid: isInvalidProp,
      maxLength = 6,
      pattern = REGEXP_ONLY_DIGITS,
      inputMode = "numeric",
      showSeparator = maxLength === 6,
      children,
      containerClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      className,
      variant = "primary",
      ...otpProps
    },
    ref
  ) => {
    const errorText = errorMessage ?? error;
    const isInvalid = Boolean(errorText) || Boolean(isInvalidProp);

    const renderSlots = () => {
      if (children) return children;

      // When 6 digits with separator: [Slot 0, 1, 2] - [Slot 3, 4, 5]
      if (maxLength === 6 && showSeparator) {
        return (
          <>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </>
        );
      }

      // Default: render single group with all slots
      return (
        <InputOTP.Group>
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTP.Slot key={index} index={index} />
          ))}
        </InputOTP.Group>
      );
    };

    return (
      <TextField
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={containerClassName}
      >
        {label ? <Label className={labelClassName}>{label}</Label> : null}

        <InputOTP
          ref={ref}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          variant={variant}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          className={className}
          {...otpProps}
        >
          {renderSlots()}
        </InputOTP>

        {description && !errorText ? (
          <Description className={descriptionClassName}>{description}</Description>
        ) : null}

        <FieldError className={errorClassName}>{errorText}</FieldError>
      </TextField>
    );
  }
);

AppInputOtp.displayName = "AppInputOtp";
