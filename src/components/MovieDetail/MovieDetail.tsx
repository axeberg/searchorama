import { useParams } from "react-router-dom";

export default function MovieDetail() {
  let params = useParams();

  return <>Movie detail here for movie with id {params.movieId}</>;
}
