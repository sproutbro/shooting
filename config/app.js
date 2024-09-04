export default function (express) {
  const app = express();

  // 공용 고정 경로
  app.use(express.static("public"));

  // 바디 파서
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
}
