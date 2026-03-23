import "react";

declare module "react" {
  type HTMLAttributes<T> = {
    tw?: string;
  };
}
