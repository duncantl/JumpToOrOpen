mani = "~/Projects/FirefoxExtensions/AutoClose/JumpToOrOpen/manifest.json"
z = RJSONIO::fromJSON(mani)
m = mapply(function(id, k) structure(unname(k$suggested_key), name = id),  names(z$commands), z$commands)
cat(sprintf("+ %s: %s", names(m), m), sep = "\n")
