#!/bin/bash

for PACKAGE in packages/*; do
    if [ -d "$PACKAGE" ]; then
        PACKAGE_NAME=$(jq -r .name "$PACKAGE/package.json")
        LOCAL_VERSION=$(jq -r .version "$PACKAGE/package.json")
        NPM_VERSION=$(npm view "$PACKAGE_NAME" version 2>/dev/null)
        
        if [ "$LOCAL_VERSION" != "$NPM_VERSION" ]; then
            echo "Publishing $PACKAGE_NAME@$LOCAL_VERSION..."
            # Set up .npmrc with the auth token from environment variable
            echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$PACKAGE/.npmrc"
            
            # Attempt to publish
            (cd "$PACKAGE" && pnpm publish --access public --no-git-checks)
            
            # Optionally, remove the .npmrc file after publishing to clean up
            rm "$PACKAGE/.npmrc"
            
            echo "$PACKAGE_NAME@$LOCAL_VERSION published."
        else
            echo "Version synced for $PACKAGE_NAME."
        fi
    fi
done
