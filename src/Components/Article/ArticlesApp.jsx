import { useEffect, useState } from "react";
import { fetchArticles } from "../../Services/ArticleService";
import ListArticles from "./ListArticles";
import ExampleWithThemeProvider from "./ExempleWithThemeProvider";
import InsertArticle from "./InsertArticle";
// import confirmAlert from "react-confirm-alert";
// import { confirmAlert } from 'react-confirm-alert'; // Import
import { deleteArticle } from "../../Services/ArticleService";
import { confirmAlert } from "react-confirm-alert";




const ArticlesApp = () => {
  const [articles, setArticles] = useState([]);
  const [a, setA] = useState(10);

  const deleteProduct = (productId, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deleteArticle(productId)
              .then((res) =>
                setArticles(
                  articles.filter((product) => product._id !== productId)
                )
              )

              //.then(console.log("suppression effectuée avec success"))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };

  useEffect(() => {
    loadArticles();
    console.log(articles);
  }, []);
  const loadArticles = async () => {
    const response = await fetchArticles();
    console.log("fetch article");
    setArticles(response.data);
  };

  const addArticle = (newArticle) => {
    setArticles([ newArticle,...articles])
  };

  const deleteArticle = (articleId => {
      setArticles(articles.filter(article => article._id !== articleId))
  })

  const updateArticle = (updatedArticle) => {
    setArticles(
      articles.map((article) =>
        article._id === updatedArticle._id ? updatedArticle : article
      )
    );
  };


  const displayArticles = () => {
    //    return articles.map((article) => {
    //    return (
    //        <div key={article._id} className='col'>
    //         <img src={article.imageart} alt="" />
    //         <h3>{article.designation}</h3>
    //    </div>
    //    <CardArticle key={article._id} article={article} />
    //    <ListArticles article={article} />
    // )
  };
  // )

  return (
    <div className="container">
      <InsertArticle addProduct={addArticle} />
      {/* <button className='btn btn-primary' onClick={addArticle}>Ajouter</button> */}
      {/* <div>
                  valeur de a: {a}
                  <button onClick={change}>change</button>
              </div> */}
      <h1>Liste des Articles ({articles.length})</h1>
      <ListArticles articles={articles} deleteProduct={deleteProduct} updateProduct={updateArticle} />
      {/* <ExampleWithThemeProvider articles={articles} deletearticle={deleteProduct} /> */}
      {/* <div className="row"> */}

      {/* {displayArticles()} */}
      {/* </div> */}
    </div>
  );
};

export default ArticlesApp;
