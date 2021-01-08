# Log

**2021.01.08 13:16** I'm starting again on my second day. Yesterday was mostly process and scaffolding. I also bumped into an issue with TS behaving unexpectedly with extending Errors. Will fix that. Another thing I'd like to address right away is the ingress. GKE ingress is... well not good and inflexible, seems like additionally it does not play well with CF proxy either(or vice versa). I'll give it an half an hour of debugging and testing, but if I cannot make it work I'll fail fast and just use k8s service exposed.

- [x] Fix Error inheritance
- [x] Fix Ingress: Turns out CF Certs only allow one-level deep sub-domains and I was trying to use `prod.text-editor.viskus.io` + the ingress was buggy and wasted another 30 mins. Fell back to just using LB service type and dynamic IP for now.

**2021.01.08 13:16** An hour later I'm moving on to the business logic. Really have to be aware of the scope now to ship something useful. I'll start with mocking the most necessary parts for the FE team to start prototyping against a real API.

**2021.01.08 16:09** Time's up. Pencils down. The `ot-json0` library gave me some headaches because it lacked some checks to make sure transformations were valid even though it looked like it supposed to make sure they are. Some things I'd continue to work on from now on:

- Proper testing setup: Not proud of it at all.
- Stricter TS: Current setup gives some soft guidance, but doesn't really avoid many of the common errors easy to make.
- Automatic CI: I'd build autobuilds for docker for every commit in the CI and deploys to Kubernetes on every commit to `master`.
- Business logic: Didn't really get far with the business logic on this one. Details on the plans in [todo.md](./todo.md).

Was fun.
