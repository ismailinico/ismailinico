#!/bin/bash

for PACKAGE in packages/*; do
    if [ -d "$PACKAGE" ]; then
        PACKAGE_NAME=$(jq -r .name "$PACKAGE/package.json")
        LOCAL_VERSION=$(jq -r .version "$PACKAGE/package.json")
        NPM_VERSION=$(npm view "$PACKAGE_NAME" version 2>/dev/null)
        
        if [ "$LOCAL_VERSION" != "$NPM_VERSION" ]; then
            echo "Publishing $PACKAGE_NAME@$LOCAL_VERSION..."

            # Attempt to publish or exit with error if it fails
            if ! (cd "$PACKAGE" && npm publish --access public); then
                echo "Failed to publish $PACKAGE_NAME@$LOCAL_VERSION."
                exit 1
            fi

            echo "Published $PACKAGE_NAME@$LOCAL_VERSION."
        else
            echo "Version synced for $PACKAGE_NAME."
        fi
    fi
done
