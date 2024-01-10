function generateCaptcha(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute(
      "6Lf1u0opAAAAAGwJDlV_kX1g96EJxS3PubyvvjzG",
      { action: "LOGIN" },
    );
  });
}
