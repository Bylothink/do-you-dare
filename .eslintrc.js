module.exports = {
  root: true,
  extends: [
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  overrides: [
    {
      files: ["*.ts"],
      rules: { "no-unused-vars": "off" }
    },
    {
      files: ["*.vue"],
      rules: {
        "vue/no-multiple-template-root": "off",
        "vue/no-v-model-argument": "off"
      }
    }
  ]
};
