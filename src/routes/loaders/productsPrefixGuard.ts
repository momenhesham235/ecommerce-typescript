import type { LoaderFunctionArgs } from "react-router-dom";

// Loader = أي منطق بيشتغل قبل ما الصفحة تترندر
const productsPrefixGuard = async ({ params }: LoaderFunctionArgs) => {
  const prefix = params.prefix;

  if (!prefix || !/^[a-z]+$/i.test(prefix)) {
    throw new Response("Bad Request", {
      status: 404,
      statusText: "Category not found",
    });
  }

  return prefix;
};

export default productsPrefixGuard;
