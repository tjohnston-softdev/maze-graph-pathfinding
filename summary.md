# Summary

**Version:** 1.0.14

**Date:** 2021-03-29

**Title:** Fixed object validation bug

**Description:**

Fixed bug where JSON objects are validated incorrectly.
It checked for 'string' type instead of 'object'.
This caused the graph integrity check to fail.