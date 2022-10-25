import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHeader } from "../../components/Layout/HeaderContext";
import {
  COLORS,
  EMAIL_REGEX,
  PHONE_FORMAT,
} from "../../shared/common/constants";
import { createContact } from "../../shared/network/user.api";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: { margin: 8 },
  inputLabel: {
    color: COLORS.lightGrey,
    fontSize: "1.25rem",
  },
});

export type NewContactFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
};

const ContactCreate = () => {
  const { t } = useTranslation();
  const { setHeaderName, setLoading, setFooter } = useHeader();
  const classes = useStyles();
  const form = useForm<NewContactFormValues>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setHeaderName?.(t("contact.new")?.toString());
    return () => setHeaderName(null);
  }, [setHeaderName, t]);

  useEffect(() => {
    setFooter?.([]);
    return () => setFooter?.([]);
  }, [setFooter]);

  const onSubmit = async (values: NewContactFormValues) => {
    setLoading(true);
    try {
      await createContact({
        address: values.address,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      });
      enqueueSnackbar(t("contact.create.success")?.toString(), {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(t("contact.create.failure")?.toString(), {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.firstName")?.toString()}
          </Typography>
          <Controller
            control={form.control}
            name="firstName"
            defaultValue=""
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder={t("contact.enterFormValues.firstName")?.toString()}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.lastName")?.toString()}
          </Typography>
          <Controller
            control={form.control}
            defaultValue=""
            name="lastName"
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder={t("contact.enterFormValues.lastName")?.toString()}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.email")?.toString()}
          </Typography>
          <Controller
            control={form.control}
            defaultValue=""
            name="email"
            rules={{
              required: t("validation.required").toString(),
              pattern: {
                value: EMAIL_REGEX,
                message: t("validation.invalidFormat", {
                  subject: t("subject.email"),
                }),
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder={t("contact.enterFormValues.email")?.toString()}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.phone")?.toString()}
          </Typography>
          <Controller
            control={form.control}
            defaultValue=""
            name="phone"
            rules={{
              required: t("validation.required").toString(),
              pattern: {
                value: PHONE_FORMAT,
                message: t("validation.invalidFormat", {
                  subject: t("subject.phone"),
                }),
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder={t("contact.enterFormValues.phone")?.toString()}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false, inlist: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.inputLabel}>
            {t("contact.formValues.address")?.toString()}
          </Typography>
          <Controller
            control={form.control}
            defaultValue=""
            name="address"
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder={t("contact.enterFormValues.address")?.toString()}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: false, inlist: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container>
          <Button variant="outlined" color="secondary" type="submit">
            {t("button.create.contact")?.toString()}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactCreate;
