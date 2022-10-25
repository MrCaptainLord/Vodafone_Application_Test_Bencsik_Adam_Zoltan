import { Grid, makeStyles, Typography } from "@material-ui/core";
import { BOX_SHADOW, COLORS } from "../../shared/common/constants";
import { ContactType } from "../../shared/common/types";

export type SearchFormValues = {
  searchParameter: string;
};

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "100%",
    boxShadow: BOX_SHADOW,
    border: `2px solid ${COLORS.shadowLight}`,
    borderRadius: 8,
  },
  thumbNailProfile: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    maxWidth: 130,
    resizeMode: "contain",
  },
  bold: { fontWeight: 600 },
  gray: { color: COLORS.lightGrey },
  dataRow: { alignItems: "center", display: "flex" },
  dataRowSecondary: {},
});

type Props = {
  contact: ContactType;
};

const Contact = ({ contact }: Props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.card}>
      <Grid item xs={4} style={{ padding: 8 }}>
        <img
          src={contact.picture.large}
          className={classes.thumbNailProfile}
          alt=""
        />
      </Grid>
      <Grid container item xs={8} style={{ paddingLeft: 12 }}>
        <Grid item xs={12} className={classes.dataRow}>
          <Typography variant="h5" className={classes.bold} noWrap>
            {`${contact.name.first}, ${contact.name.last}`}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.dataRowSecondary}>
          <Typography className={classes.gray} noWrap>
            {contact.email}
          </Typography>
          <Typography className={classes.gray} noWrap>
            {contact.phone}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
