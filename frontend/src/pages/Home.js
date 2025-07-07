import NavigationPanel from "../components/NavigationPanel";

const Home = () => {
  return (
    <NavigationPanel
      heading="Wybierz tryb testu"
      description="Z nami angielski jest prostszy! Sprawdź swoje umiejętności i poprawiaj je każdego dnia."
      actions={[
        { label: "Pytania zamknięte", path: "/closed-questions" },
        { label: "Pytania otwarte", path: "/open-questions" },
        { label: "Mix", path: "/questions-mix" },
      ]}
    />
  );
};

export default Home;
