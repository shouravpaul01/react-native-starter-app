import React, { forwardRef, type ComponentRef, type ReactNode } from "react";
import {
  Description,
  FieldError,
  Label,
  Radio,
  RadioGroup,
  type RadioGroupProps,
} from "heroui-native";
import { View } from "react-native";

export interface RadioGroupOption {
  /** Unique value representing this option */
  value: string;

  /** Title / label text or custom element for this option */
  label: ReactNode;

  /** Secondary helper text for this option */
  description?: ReactNode;

  /** Whether this specific option is disabled */
  isDisabled?: boolean;
}

export interface AppRadioGroupProps extends Omit<
  RadioGroupProps,
  "children" | "value" | "onValueChange"
> {
  /** Group title / label shown above the radio options */
  label?: ReactNode;

  /** Helper or explanatory text shown beneath the group label */
  description?: ReactNode;

  /** Error message displayed beneath the radio group when invalid */
  errorMessage?: ReactNode;

  /** Convenient alias for errorMessage */
  error?: ReactNode;

  /** Whether the field is required (shows asterisk on group label) */
  isRequired?: boolean;

  /** Predefined options to render. If omitted, custom children can be provided */
  options?: RadioGroupOption[];

  /** Custom radio items (e.g. `<RadioGroup.Item>` elements) */
  children?: ReactNode;

  /** Currently selected radio value */
  value?: string;

  /** Callback fired when selected value changes */
  onValueChange?: (value: string) => void;

  /**
   * Position of the radio circle relative to the item label.
   * - "end": Label on the left, radio circle on the right (default)
   * - "start": Radio circle on the left, label on the right
   * @default "end"
   */
  radioPlacement?: "start" | "end";

  /**
   * Layout direction of the radio items.
   * - "vertical": Stacked in a column (default)
   * - "horizontal": Laid out side-by-side in a row
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";

  /** Tailwind / Uniwind class name applied to the outer container */
  containerClassName?: string;

  /** Tailwind / Uniwind class name applied to the RadioGroup element */
  groupClassName?: string;

  /** Tailwind / Uniwind class name applied to each RadioGroup.Item */
  itemClassName?: string;

  /** Tailwind / Uniwind class name applied to the group Label component */
  labelClassName?: string;

  /** Tailwind / Uniwind class name applied to the group Description component */
  descriptionClassName?: string;

  /** Tailwind / Uniwind class name applied to the FieldError component */
  errorClassName?: string;
}

export type AppRadioGroupRef = ComponentRef<typeof View>;

const AppRadioGroupRoot = forwardRef<AppRadioGroupRef, AppRadioGroupProps>(
  (
    {
      label,
      description,
      errorMessage,
      error,
      isRequired = false,
      options,
      children,
      value,
      onValueChange,
      isDisabled = false,
      isInvalid: isInvalidProp,
      radioPlacement = "end",
      orientation = "vertical",
      variant = "primary",
      containerClassName,
      groupClassName,
      itemClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      className,
      ...radioGroupProps
    },
    ref
  ) => {
    const errorText = errorMessage ?? error;
    const isInvalid = Boolean(errorText) || Boolean(isInvalidProp);

    const renderItems = () => {
      if (children) return children;

      if (!options || options.length === 0) return null;

      return options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          isDisabled={option.isDisabled || isDisabled}
          className={itemClassName}
        >
          {radioPlacement === "start" ? (
            <>
              <Radio />
              <View className="flex-1">
                {typeof option.label === "string" ? <Label>{option.label}</Label> : option.label}
                {option.description ? <Description>{option.description}</Description> : null}
              </View>
            </>
          ) : (
            <>
              <View className="flex-1">
                {typeof option.label === "string" ? <Label>{option.label}</Label> : option.label}
                {option.description ? <Description>{option.description}</Description> : null}
              </View>
              <Radio />
            </>
          )}
        </RadioGroup.Item>
      ));
    };

    const orientationClasses =
      orientation === "horizontal" ? "flex-row flex-wrap gap-4" : undefined;

    const mergedGroupClassName = [orientationClasses, groupClassName, className]
      .filter(Boolean)
      .join(" ");

    return (
      <View className={containerClassName ? `gap-2 ${containerClassName}` : "gap-2"}>
        {label ? (
          <Label isRequired={isRequired} className={labelClassName}>
            {label}
          </Label>
        ) : null}

        {description && !errorText ? (
          <Description className={descriptionClassName}>{description}</Description>
        ) : null}

        <RadioGroup
          ref={ref}
          value={value}
          onValueChange={onValueChange ?? (() => {})}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          variant={variant}
          className={mergedGroupClassName}
          {...radioGroupProps}
        >
          {renderItems()}
          <FieldError className={errorClassName}>{errorText}</FieldError>
        </RadioGroup>
      </View>
    );
  }
);

AppRadioGroupRoot.displayName = "AppRadioGroup";

export const AppRadioGroup = Object.assign(AppRadioGroupRoot, {
  Item: RadioGroup.Item,
  Radio,
});
