import { Terminal } from "xterm";

export function getGddsLogo(t: Terminal) {
  t.writeln(`   ___      ___      ___      ___   `);
  t.writeln(`  /\\  \\    /\\  \\    /\\  \\    /\\  \\  `);
  t.writeln(` /::\\  \\  /::\\  \\  /::\\  \\  /::\\  \\ `);
  t.writeln(`/:/\\:\\__\\/:/\\:\\__\\/:/\\:\\__\\/\\:\\:\\__\\`);
  t.writeln(`\\:\\:\\/__/\\:\\/:/  /\\:\\/:/  /\\:\\:\\/__/`);
  t.writeln(` \\::/  /  \\::/  /  \\::/  /  \\::/  / `);
  t.writeln(`  \\/__/    \\/__/    \\/__/    \\/__/  `);
  t.writeln("");
  t.writeln(`Welcome to the GDDS Terminal! Let's get coding!`);
}
