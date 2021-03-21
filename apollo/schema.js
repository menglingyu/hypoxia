// import { makeVar } from '@apollo/client';
import { gql } from '@apollo/client';
import { PostQuery } from '../lib/graphql';

const zipToCity = (value) => {
  return 'Kansas City, MO';
};

export const typePolicies = {
  // Post: {
  //   comments: {
  //     merge(existing, incoming, {
  //       args: { cursor },
  //       readField,
  //     }) {
  //       debugger
  //       const merged = existing ? existing.slice(0) : [];

  //       let offset = offsetFromCursor(merged, cursor, readField);
  //       if (offset < 0) offset = merged.length;

  //       for (let i = 0; i < incoming.length; ++i) {
  //         merged[offset + i] = incoming[i];
  //       }
  //       return merged
  //     },
  //   }
  // },
  Query: {
    fields: {
      postsQuery: {
        keyArgs: ["type"],

        merge(existing, incoming, {
          args: { cursor },
          readField,
        }) {
          const merged = existing ? existing.edges.slice(0) : [];

          let offset = offsetFromCursor(merged, cursor, readField);
          if (offset < 0) offset = merged.length;

          for (let i = 0; i < incoming.edges.length; ++i) {
            merged[offset + i] = incoming.edges[i];
          }
          return {
            ...incoming,
            edges: merged
          }
        },
      }
    }
  },
  // Mutation: {
  //   fields: {
  //     createNewPost: {
  //       merge(existing, incoming, args, cache, ...rest) {
  //         console.log('incoming', incoming);
  //         const response = cache.readQuery({ query: PostQuery })




  //         // console.log('existing, incoming', existing, incoming, args, cache,);
  //         // if (!existing) return incoming
  //         // return {
  //         //   edges: [...existing.edges, incoming.edges],
  //         //   ...incoming
  //         // }
  //       },
  //     }
  //   }
  // }
};




function offsetFromCursor(items, cursor, readField) {
  // Search from the back of the list because the cursor we're
  // looking for is typically the ID of the last item.
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    // Using readField works for both non-normalized objects
    // (returning item.id) and normalized references (returning
    // the id field from the referenced entity object), so it's
    // a good idea to use readField when you're not sure what
    // kind of elements you're dealing with.
    if (readField("id", item) === cursor) {
      // Add one because the cursor identifies the item just
      // before the first item in the page we care about.
      return i + 1;
    }
  }
  // Report that the cursor could not be found.
  return -1;
}