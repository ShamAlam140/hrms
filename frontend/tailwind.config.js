


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        "grey-70": "#515151",
        "notification-error": "#de1f1f",
        "grey-50": "#a2a2a2",
        "grey-40": "#d0d0d0",
        "grey-100": "#121212",
        "grey-30": "#ddd",
        "relia-energy-black": "#272525",
        "relia-energy-gradient": "#14add5",
        "grey-80": "#383838",
        "relia-energy-primary-color": "#5584ce",
        dodgerblue: "#0089ff",
      },
      spacing: {},
      fontFamily: {
        "heading-4": "Nunito",
        "body-small-12": "Poppins",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      xs: "12px",
      xl: "20px",
      "9xl": "28px",
      smi: "13px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
