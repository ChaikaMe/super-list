interface ComponentWithText {
  className: string;
  children: string;
}

export interface MainTitleProps extends ComponentWithText {}

export interface ButtonProps extends ComponentWithText {
  onClick: () => void;
  disabled?: boolean;
}

export interface LinkButtonProps extends ComponentWithText {
  address: string;
}

export interface HeroesListProps {
  heroes: object[];
}
