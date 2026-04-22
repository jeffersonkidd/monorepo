import clsx from "clsx";
import { AnchorOrButton, type AnchorOrButtonProps } from "utils";
import "./logo.css";
import { Flex } from "layout";

export type LogoProps = AnchorOrButtonProps & {
  showText?: boolean;
};
export function Logo({ className, showText = true, ...props }: LogoProps) {
  const classNames = clsx(className, "logo");
  return (
    <AnchorOrButton className={classNames} {...props} aria-label="Company logo">
      <Flex className="logo" direction="row" alignPrimary="center" alignSecondary="center" gap="200">
        <svg width="38" height="48" viewBox="0 0 38 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.50204 0.413546C2.02984 0.216105 0.597928 -0.290107 0.111165 0.222938C-0.119398 0.838027 0.0743076 1.95234 0.111178 2.34849C0.329605 4.69495 1.25338 8.14594 2.64522 11.0414C4.03705 13.9368 10.2221 14.9485 11.681 15.4295C15.3713 16.6463 15.6006 16.3486 25.1727 19.5547C16.4394 18.238 3.51068 12.5362 3.8066 14.1849C4.27724 16.807 7.47856 22.2078 10.5099 23.1129C13.7034 24.4778 22.6281 24.0942 26.5636 25.0426C22.5163 25.4294 11.6202 23.5418 10.89 24.5238C10.1599 25.5058 14.1828 29.9622 16.2588 30.6512C18.3347 31.3402 27.9468 29.0172 27.9468 29.0172C27.9468 29.0172 24.09 35.231 23.8609 35.7361L29.3925 34.7654C28.5836 37.0305 26.0827 42.8226 24.0922 48C26.9081 43.6836 35.5841 32.114 36.6066 30.2999L31.2817 30.8294C31.2817 30.8294 34.2332 27.0686 35.2911 25.0426C36.3491 23.0165 38.1788 19.0745 37.9859 18.238C37.7929 17.4015 30.2235 14.1956 28.7089 13.5644C27.1944 12.9332 23.2457 10.9096 18.522 8.59417C13.7984 6.27875 7.9853 2.50982 2.50204 0.413546Z" fill="currentColor"/>
        </svg>  
        {showText ? <span className="logo__text">MonoFly SDS</span> : null}
      </Flex>
    </AnchorOrButton>
  );
}
