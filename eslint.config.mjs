import next from "eslint-config-next";

/**
 * eslint-config-next v16 ships a native flat-config array (core-web-vitals +
 * typescript), so it's spread directly — no FlatCompat needed.
 */
const eslintConfig = [
  ...next,
  {
    ignores: ["legacy-flutter/**", "out/**", ".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
