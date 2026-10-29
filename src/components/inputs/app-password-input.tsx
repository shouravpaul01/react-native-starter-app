import React, { forwardRef, useState } from "react";
import { Pressable } from "react-native";
import { useThemeColor, type InputRef } from "heroui-native";
import { AppInput, type AppInputProps } from "./app-input";
import { EyeIcon, EyeOffIcon } from "../icons/icons";

export interface AppPasswordInputProps extends Omit<AppInputProps, "secureTextEntry"> {
  /** Optional callback fired when password visibility toggles */
  onToggleVisibility?: (isVisible: boolean) => void;

  /** Custom icon component when password is visible (tap to hide) */
  hideIcon?: React.ReactNode;

  /** Custom icon component when password is hidden (tap to show) */
  showIcon?: React.ReactNode;

  /** Size of default eye icons. Default: 20 */
  toggleIconSize?: number;
}

export const AppPasswordInput = forwardRef<InputRef, AppPasswordInputProps>(
  (
    {
      suffix,
      rightContent,
      onToggleVisibility,
      hideIcon,
      showIcon,
      toggleIconSize = 20,
      ...restProps
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const iconColor = useThemeColor("muted");

    const handleToggle = () => {
      const next = !isVisible;
      setIsVisible(next);
      onToggleVisibility?.(next);
    };

    const defaultToggleElement = (
      <Pressable
        onPress={handleToggle}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel={isVisible ? "Hide password" : "Show password"}
        className="active:opacity-60 justify-center items-center py-1"
      >
        {isVisible
          ? (hideIcon ?? <EyeOffIcon size={toggleIconSize} color={iconColor} />)
          : (showIcon ?? <EyeIcon size={toggleIconSize} color={iconColor} />)}
      </Pressable>
    );

    return (
      <AppInput
        ref={ref}
        secureTextEntry={!isVisible}
        isSuffixDecorative={false}
        suffix={suffix ?? rightContent ?? defaultToggleElement}
        {...restProps}
      />
    );
  }
);

AppPasswordInput.displayName = "AppPasswordInput";
