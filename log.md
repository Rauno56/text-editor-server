# Log

**2021.01.08 13:16** I'm starting again on my second day. Yesterday was mostly process and scaffolding. I also bumped into an issue with TS behaving unexpectedly with extending Errors. Will fix that. Another thing I'd like to address right away is the ingress. GKE ingress is... well not good and inflexible, seems like additionally it does not play well with CF proxy either(or vice versa). I'll give it an half an hour of debugging and testing, but if I cannot make it work I'll fail fast and just use k8s service exposed.

- [ ] Fix Error inheritance
- [ ] Fix Ingress
