import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import pendingtask from "../../../assets/pendingtask.png";
import completed from "../../../assets/completed.png";
import notstarted from "../../../assets/notstarted.png";
import notapproved from "../../../assets/notapproved.png";
export default function ActionAreaCard(props) {
  const key = props.num;
  const count = props.count;

  const [img, setImg] = React.useState();
  const [alttext, setAlttext] = React.useState("");
  const [name, setName] = React.useState("");
  const [cardcolor, setColor] = React.useState();
  React.useEffect(() => {
    if (key === 3) {
      setImg(notapproved);
      setAlttext("alttext");
      setName("Yet To Approve");
      setColor("#B0DAFF");
    } else if (key === 0) {
      setImg(notstarted);
      setAlttext("alttext");
      setName("Overdue");
      setColor("#FF6868");
    } else if (key === 1) {
      setImg(pendingtask);
      setAlttext("alttext");
      setName("Pending");
      setColor("#FDFFAB");
    } else {
      setImg(completed);
      setAlttext("alttext");
      setName("Completed");
      setColor("#A1EEBD");
    }
  }, [key]);

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea style={{ backgroundColor: cardcolor }}>
        <img
          src={img}
          width="80px"
          height="80px"
          alt={alttext}
          style={{ paddingLeft: "20px", paddingTop: "20px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {count[key]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
