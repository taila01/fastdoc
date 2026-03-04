import React, { useEffect, useState } from "react";

type IconFamilies = {
  [key: string]: (icon: string) => Promise<any>;
};

const Icons: IconFamilies = {
  ci: async (icon) => (await import("react-icons/ci").then(m => m[icon])),
  fa: async (icon) => (await import("react-icons/fa").then(m => m[icon])),
  fa6: async (icon) => (await import("react-icons/fa6").then(m => m[icon])),
  io: async (icon) => (await import("react-icons/io").then(m => m[icon])),
  io5: async (icon) => (await import("react-icons/io5").then(m => m[icon])),
  md: async (icon) => (await import("react-icons/md").then(m => m[icon])),
  ti: async (icon) => (await import("react-icons/ti").then(m => m[icon])),
  go: async (icon) => (await import("react-icons/go").then(m => m[icon])),
  fi: async (icon) => (await import("react-icons/fi").then(m => m[icon])),
  gi: async (icon) => (await import("react-icons/gi").then(m => m[icon])),
  wi: async (icon) => (await import("react-icons/wi").then(m => m[icon])),
  di: async (icon) => (await import("react-icons/di").then(m => m[icon])),
  ai: async (icon) => (await import("react-icons/ai").then(m => m[icon])),
  bs: async (icon) => (await import("react-icons/bs").then(m => m[icon])),
  ri: async (icon) => (await import("react-icons/ri").then(m => m[icon])),
  fc: async (icon) => (await import("react-icons/fc").then(m => m[icon])),
  gr: async (icon) => (await import("react-icons/gr").then(m => m[icon])),
  hi: async (icon) => (await import("react-icons/hi").then(m => m[icon])),
  hi2: async (icon) => (await import("react-icons/hi2").then(m => m[icon])),
  si: async (icon) => (await import("react-icons/si").then(m => m[icon])),
  sl: async (icon) => (await import("react-icons/sl").then(m => m[icon])),
  im: async (icon) => (await import("react-icons/im").then(m => m[icon])),
  bi: async (icon) => (await import("react-icons/bi").then(m => m[icon])),
  cg: async (icon) => (await import("react-icons/cg").then(m => m[icon])),
  vsc: async (icon) => (await import("react-icons/vsc").then(m => m[icon])),
  tb: async (icon) => (await import("react-icons/tb").then(m => m[icon])),
  tfi: async (icon) => (await import("react-icons/tfi").then(m => m[icon])),
};

type DynamicIconProps = {
  iconLibrary: keyof typeof Icons;
  iconName: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;  // onClick opcional
};

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconLibrary, iconName, className, onClick }) => {
  const [Icon, setIcon] = useState<React.ElementType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        if (Icons[iconLibrary]) {
          const IconComponent = await Icons[iconLibrary](iconName);
          setIcon(() => IconComponent);
        }
      } catch (error) {
        console.error(`Erro ao carregar o ícone ${iconName} da biblioteca ${iconLibrary}`, error);
      } finally {
        setLoading(false);
      }
    };

    loadIcon();
  }, [iconLibrary, iconName]);

  return (
    <>
      {loading ? (
        <span className="animate-spin w-4 h-4 border-2 border-brand-300 border-t-brand-500 rounded-full inline-block"></span>
      ) : Icon ? (
        <div onClick={onClick}>
          <Icon className={className} />
        </div>
      ) : (
        <span className="text-red-500">⚠️</span>
      )}
    </>
  );
};

export default DynamicIcon;
