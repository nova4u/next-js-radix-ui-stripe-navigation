import React, { useEffect } from "react";
import Wrapper from "@components/Wrapper/Wrapper";
import * as Menu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import clsx from "clsx";

const Navbar = () => {
  const [value, setValue] = React.useState("");
  const [position, setPosition] = React.useState<any>(0);
  const indicator = React.useRef<HTMLUListElement>(null);
  const nav = React.useRef<HTMLElement>(null);
  const arrow = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicator.current || !nav.current) return;

    const openedMenu = Array.from(indicator.current.children).filter(
      (child: Element) => {
        if (!child.children) return;
        return (child.children[0] as HTMLElement).dataset.state === "open";
      }
    );

    if (!openedMenu.length) return;

    console.log(openedMenu[0].getBoundingClientRect());
    const { x } = openedMenu[0].getBoundingClientRect();
    const { x: navLeft } = nav.current.getBoundingClientRect();
    setPosition(x - navLeft);
  }, [value]);

  // const trackValue = (value: string) => {
  //   if (!indicator?.current?.children) return;
  //   const openedMenu = Array.from(indicator.current.children).filter(
  //     (child: HTMLLIElement) => {
  //       return (
  //         child.children[0].getAttribute(`id`) ===
  //         `radix-:Rim:-trigger-${value}`
  //       );
  //     }
  //   );
  //   setValue(value);
  //   console.dir(arrow.current);
  //   console.log(arrow.current.style.transform);
  //   const translateX = arrow.current.style.transform;
  //   setPosition(translateX);
  //   console.log(openedMenu);
  // };

  return (
    <header className="bg-slate-900/30 py-4 h-20">
      <Wrapper className={`flex items-center h-full text-slate-50`}>
        <h2 className="font-medium tracking-tighter  text-3xl">@dmarushchak</h2>
        <Menu.Root
          ref={nav}
          className="ml-8 text-base relative"
          value={value}
          onValueChange={setValue}
        >
          <Menu.List className="flex" ref={indicator}>
            {MenuItems.map((item, i) => {
              return (
                <Menu.Item
                  key={i}
                  className="w-auto h-10 flex"
                  value={item.value.toString()}
                >
                  <Menu.Trigger className="px-3">
                    <p
                      className={clsx(
                        `font-medium text-md `,
                        item.value.toString() === value
                          ? "text-slate-50"
                          : "text-slate-200"
                      )}
                    >
                      {item.name}
                    </p>
                  </Menu.Trigger>
                  <Menu.Content asChild>
                    <ul
                      className={clsx(
                        `content absolute  shadow-sm rounded-md p-5   top-0 left-0 w-max grid gap-4`,
                        {
                          "grid-cols-3": item.name === "Solutions",
                          "grid-cols-4": item.name === "Something else",
                          "grid-cols-2": ![
                            "Solutions",
                            "Something else",
                          ].includes(item.name),
                        }
                      )}
                    >
                      {item.items.map((subItem, i) => {
                        return (
                          <li key={i} className="block">
                            <Link href="#">{subItem.title}</Link>
                            <p className="text-xs text-slate-400 block">
                              {subItem.body}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </Menu.Content>
                </Menu.Item>
              );
            })}
            <StyledIndicatorWithArrow ref={arrow} />
          </Menu.List>
          <div
            className="absolute flex items-center  left-0 top-full w-max justify-center ease duration-200"
            style={{
              transform: `translateX(${position}px)`,
              perspective: "2000px",
            }}
          >
            <Menu.Viewport
              style={{}}
              className={clsx(
                "viewport overflow-hidden transition-transform relative origin-[top_center] bg-slate-700 rounded-md m-3",
                `state-open:animate-scaleIn`,
                "state-closed:animate-scaleOut"
              )}
            />
          </div>
        </Menu.Root>
      </Wrapper>
    </header>
  );
};

const StyledIndicatorWithArrow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Menu.Indicator>
>((props, forwardedRef) => (
  <Menu.Indicator {...props} ref={forwardedRef}>
    <div
      className="relative mt-2 bg-slate-700 w-3 h-3 rotate-45 mx-auto transition-transform duration-500 ease-in"
      style={{ borderTopLeftRadius: "5px" }}
    ></div>
  </Menu.Indicator>
));

StyledIndicatorWithArrow.displayName = "StyledIndicatorWithArrow";

interface MenuItem {
  name: string;
  items: SubItem[];
  value: number | string;
}

interface SubItem {
  title: string;
  body: string;
}

const MenuItems: MenuItem[] = [
  {
    name: "Products",
    value: "dinah",
    items: [
      {
        title: "Payments",
        body: "Online payments",
      },
      {
        title: "Checkout",
        body: "Pre-built payments page",
      },
      {
        title: "Elements",
        body: "Customisable payments UIs",
      },
      {
        title: "Payment Links",
        body: "No-code payments",
      },
      {
        title: "Connect",
        body: "Payments for platforms",
      },
      {
        title: "Invoicing",
        body: "Online invoices",
      },
      {
        title: "Billing",
        body: "Subscription management",
      },
    ],
  },
  {
    name: "Solutions",
    value: 2,
    items: [
      {
        title: "E-commerce",
        body: "Online payments",
      },
      {
        title: "SaaS",
        body: "Pre-built payments page",
      },
      {
        title: "Marketplaces",
        body: "Customisable payments UIs",
      },
      {
        title: "Embedded Finance",
        body: "No-code payments",
      },
      {
        title: "Platforms",
        body: "Payments for platforms",
      },
      {
        title: "Creator Economy",
        body: "Online invoices",
      },
      {
        title: "Crypto",
        body: "Subscription management",
      },
      {
        title: "Global Business",
        body: "Subscription management",
      },
    ],
  },
  {
    name: "Something else",
    value: 3,
    items: [
      {
        title: "Payments",
        body: "Online payments",
      },
      {
        title: "Checkout",
        body: "Pre-built payments page",
      },
      {
        title: "Elements",
        body: "Customisable payments UIs",
      },
      {
        title: "Payment Links",
        body: "No-code payments",
      },
      {
        title: "Connect",
        body: "Payments for platforms",
      },
      {
        title: "Invoicing",
        body: "Online invoices",
      },
      {
        title: "Billing",
        body: "Subscription management",
      },
    ],
  },
  {
    name: "Docs",
    value: 4,
    items: [
      {
        title: "Payments",
        body: "Online payments",
      },
      {
        title: "Checkout",
        body: "Pre-built payments page",
      },
      {
        title: "Elements",
        body: "Customisable payments UIs",
      },
      {
        title: "Payment Links",
        body: "No-code payments",
      },
      {
        title: "Connect",
        body: "Payments for platforms",
      },
      {
        title: "Invoicing",
        body: "Online invoices",
      },
      {
        title: "Billing",
        body: "Subscription management",
      },
    ],
  },
  {
    name: "Developers",
    value: 5,
    items: [
      {
        title: "Payments",
        body: "Online payments",
      },
      {
        title: "Checkout",
        body: "Pre-built payments page",
      },
      {
        title: "Elements",
        body: "Customisable payments UIs",
      },
      {
        title: "Payment Links",
        body: "No-code payments",
      },
      {
        title: "Connect",
        body: "Payments for platforms",
      },
      {
        title: "Invoicing",
        body: "Online invoices",
      },
      {
        title: "Billing",
        body: "Subscription management",
      },
    ],
  },
];

export default Navbar;
