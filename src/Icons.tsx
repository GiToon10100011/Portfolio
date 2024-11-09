import styled from "styled-components";

interface IHelpIconProps {
  onHover?: () => void;
  onExit?: () => void;
  content?: string;
  $isHovering?: boolean;
}

const HelpIconContainer = styled.div<IHelpIconProps>`
  all: initial;
  color: white;
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: attr(data-content);
    z-index: 20;
    position: absolute;
    top: calc(100% + 12px);
    right: -130px;
    width: 160px;
    height: 40px;
    padding: 20px;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transform: scaleY(${({ $isHovering }) => ($isHovering ? 1 : 0)});
    will-change: transform, opacity;
    font-size: 14px;
    text-align: left;
    background-color: black;
    transform-origin: top;
    opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
    transition: all 0.3s;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%) scaleY(-1);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
    z-index: 2;
    opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
    transition: all 0.3s;
  }
  &:hover {
    &::before {
      transform: scale(1);
      filter: brightness(1);
      opacity: 1;
    }
    &::after {
      opacity: 1;
    }
  }
`;

export const PlayIcon = () => {
  return (
    <svg
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.62174 1.057C2.50895 0.990127 2.38047 0.954298 2.24936 0.953153C2.11824 0.952008 1.98916 0.985587 1.87523 1.05048C1.76129 1.11537 1.66656 1.20926 1.60065 1.32262C1.53475 1.43597 1.50002 1.56475 1.5 1.69587V18.8983C1.50002 19.0294 1.53475 19.1582 1.60065 19.2716C1.66656 19.3849 1.76129 19.4788 1.87523 19.5437C1.98916 19.6086 2.11824 19.6422 2.24936 19.641C2.38047 19.6399 2.50895 19.604 2.62174 19.5372L17.1362 10.936C17.2471 10.8702 17.3389 10.7767 17.4027 10.6647C17.4665 10.5527 17.5 10.426 17.5 10.2971C17.5 10.1682 17.4665 10.0415 17.4027 9.92949C17.3389 9.81748 17.2471 9.72399 17.1362 9.65822L2.62174 1.057Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const MoreInfoIcon = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 16V12"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8H12.51"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const NetworkStatusIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16669 10.4583C5.81382 9.08637 7.88969 8.33508 10.0334 8.33508C12.177 8.33508 14.2529 9.08637 15.9 10.4583"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.18335 7.50001C3.6187 5.35331 6.7536 4.16888 10 4.16888C13.2464 4.16888 16.3813 5.35331 18.8167 7.50001"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.10834 13.425C7.95434 12.8239 8.9664 12.501 10.0042 12.501C11.0419 12.501 12.054 12.8239 12.9 13.425"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16.6667H10.0083"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FullScreenIcon = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="96" stroke="white" strokeWidth="8" />
      <path
        d="M145.333 83V66H128.333V54.6667H156.667V83H145.333ZM43.3335 83V54.6667H71.6668V66H54.6668V83H43.3335ZM128.333 145.333V134H145.333V117H156.667V145.333H128.333ZM43.3335 145.333V117H54.6668V134H71.6668V145.333H43.3335ZM66.0002 122.667V77.3333H134V122.667H66.0002Z"
        fill="white"
      />
    </svg>
  );
};
export const HomepageIcon = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="96" stroke="white" strokeWidth="8" />
      <path
        d="M98.1046 55.5449C99.2081 54.6454 100.792 54.6454 101.895 55.5449L152.356 96.6746C154.544 98.4576 153.283 102 150.461 102H49.5392C46.7171 102 45.4563 98.4576 47.6438 96.6746L98.1046 55.5449Z"
        fill="white"
      />
      <rect x="64" y="102" width="72" height="44" rx="1" fill="white" />
      <rect x="82" y="102" width="36" height="24" rx="1" fill="#333333" />
    </svg>
  );
};
export const HelpIcon = ({
  onHover,
  onExit,
  content,
  $isHovering,
}: IHelpIconProps) => {
  return (
    <HelpIconContainer
      data-content={content ?? ""}
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      $isHovering={$isHovering}
    >
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
        <path
          d="M10.5001 18.3334C15.1025 18.3334 18.8334 14.6025 18.8334 10.0001C18.8334 5.39771 15.1025 1.66675 10.5001 1.66675C5.89771 1.66675 2.16675 5.39771 2.16675 10.0001C2.16675 14.6025 5.89771 18.3334 10.5001 18.3334Z"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.07495 7.49999C8.27087 6.94304 8.65758 6.47341 9.16658 6.17426C9.67558 5.87512 10.274 5.76577 10.8559 5.86558C11.4378 5.96539 11.9656 6.26792 12.3458 6.71959C12.7261 7.17126 12.9342 7.74292 12.9333 8.33332C12.9333 9.99999 10.4333 10.8333 10.4333 10.8333"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 14.1667H10.5083"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </HelpIconContainer>
  );
};
export const BackIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.8332 10H4.1665"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99984 15.8334L4.1665 10.0001L9.99984 4.16675"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const HomeIcon = () => {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path
        d="M1.25 6.75L8 1.5L14.75 6.75V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H2.75C2.35218 16.5 1.97064 16.342 1.68934 16.0607C1.40804 15.7794 1.25 15.3978 1.25 15V6.75Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 16.5V9H10.25V16.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const ProfileIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const MenuIcon = () => {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path
        d="M19 1H1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5H1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 9H1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 13H1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const CheckIcon = () => {
  return (
    <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
      <path
        d="M22.8182 1L7.81818 16L1 9.18182"
        stroke="#AF53FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const NavigateArrowIcon = () => {
  return (
    <svg width="325" height="54" viewBox="0 0 325 54" fill="none">
      <path d="M0 48.5H322.5L213.5 5" stroke="white" strokeWidth="10" />
    </svg>
  );
};
