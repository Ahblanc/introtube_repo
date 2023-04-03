import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function MyApp({ Component, pageProps }) {
  const [category, setCategory] = useState([]);
  const [changeFlag, setChangeFlag] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  const onCategoryChange = () => {
    setChangeFlag(!changeFlag);
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(({ result }) => {
        setCategory(result);
      });
  }, [changeFlag]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout category={category}>
        <Component {...pageProps} onCategoryChange={onCategoryChange} />
      </Layout>
    </QueryClientProvider>
  );
}
