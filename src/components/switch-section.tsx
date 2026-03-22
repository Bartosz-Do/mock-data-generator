"use client"
import { ReactNode, Children, useEffect, useState, isValidElement, createElement } from "react";
import { cn } from "@/utilities";

export default function SwitchSection({ children, className }: {
  children: ReactNode,
  className?: string
}) {
  const [childrenArray, setChildrenArray] = useState<ReactNode[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setChildrenArray(Children.toArray(children));
  }, [children]);

  return (
    <div className={cn("switch-section", className)}>

      <div className="options">
        {childrenArray.map((el: ReactNode, i: number) => {
          if (isValidElement<{ id?: string }>(el)) {
            return (
              <div className={cn("option", { active: i === activeIndex })} key={i} onClick={() => setActiveIndex(i)}>
                {el.props.id}
              </div>
            );
          }
        })}
      </div>

      <div className="content">
        {childrenArray.map((el: ReactNode, i: number) => {
          if (isValidElement<{ id?: string, children?: ReactNode, className?: string }>(el)) {
            return createElement(
              "div",
              {
                ...el.props,
                key: i,
                className: cn(el.props.className, { "active": i === activeIndex })
              },
              el.props.children
            );
          }
        })}
      </div>
    </div>
  )
}
