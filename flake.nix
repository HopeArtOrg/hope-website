{
  description = "HopeArtOrg/hope-website";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin"];

      perSystem = {pkgs, ...}: {
        devShells =
          {
            default = pkgs.mkShell {
              nativeBuildInputs = with pkgs; [
                nodejs
                pnpm
              ];
            };
          }
          // pkgs.lib.optionalAttrs pkgs.stdenv.isLinux {
            musl = pkgs.pkgsMusl.mkShell {
              nativeBuildInputs = with pkgs.pkgsMusl; [
                nodejs
                pnpm
              ];
            };
          };
      };
    };
}
