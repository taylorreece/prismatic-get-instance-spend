# Get Instance Spend

This script helps you identify how often instances run.

To run this script, ensure that you can run `prism` commands by running `prism me`.
You should see a response like

```bash
$ prism me
Name: John Doe
Email: john.doe@acme.com
Organization: Acme
Endpoint URL: https://app.your-region.prismatic.io
```

Once you've verified that you can run `prism` commands, install the required dependencies of this script with

```bash
npm install
```

and then run

```bash
export PRISMATIC_API_KEY=$(prism me:token)
export DATE=2024-11-05
npm run start
```

A file, `result.csv` will be generated containing metrics for all of your instances on the `DATE` you specified.
