import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css"; // Assuming you have a CSS module for styles
import { memo } from "react";

type FormData = {
  username: string;
};

const schema = yup.object().shape({
  username: yup.string().required("Введіть ім'я").min(2, "Мінімум 2 символи"),
});

const StartPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    localStorage.setItem("username", data.username);

    // Ініціалізація статистики для нового користувача
    const statsRaw = localStorage.getItem("userStats");
    let stats: Record<string, number> = {};
    if (statsRaw) {
      stats = JSON.parse(statsRaw);
    }
    if (!(data.username in stats)) {
      stats[data.username] = 0;
      localStorage.setItem("userStats", JSON.stringify(stats));
    }
    navigate("/game");
  };

  return (
    <div className={styles["start-page-container"]}> {/* Changed here */}
      <div className={styles["start-card"]}> {/* Changed here */}
        <div className={styles["start-title"]}>Вітаємо у грі Hangman!</div> {/* Changed here */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <div className={styles["input-row"]}> {/* Changed here */}
            <label htmlFor="username">Ваше ім'я:</label>
            <input
              id="username"
              {...register("username")}
              placeholder="Введіть ім'я"
              type="text"
              autoComplete="off"
            />
            <button type="submit">Почати гру</button>
          </div>
          {errors.username && (
            <p className={styles.error} style={{ color: "#d32f2f", margin: "0 0 8px 0", fontSize: "0.98rem" }}> {/* Changed here */}
              {errors.username.message}
            </p>
          )}
        </form>
        <button
          className={styles["stats-btn"]}
          onClick={() => navigate("/stats")}
          type="button"
        >
          Переглянути статистику
        </button>
      </div>
    </div>
  );
};

export default memo(StartPage);