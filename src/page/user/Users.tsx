import React, { useState, useMemo } from 'react';
import { SplitPane } from '../../component/SplitPane';
import { useLoading } from '../../hooks/useLoading';
import { UserDetails, userService } from '../../service/userService';
import { SelectUser } from '../SelectUser';
import { UserDetailsView } from './UserDetailsView';

export interface LocalUserMutations {
  [key: number]: UserDetails;
}

export function Users() {
  const fetchedUsers = useLoading(
    () => userService.getAll()
  )[0] || [];
  
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [localMutations, setLocalMutations] = useState(() => new Map<number, UserDetails>());
  const [toRemove, setToRemove] = useState<UserDetails | null>(null)

  const users = useMemo(
    () => {
      const added: Array<UserDetails> = [];

      for (const [id, user] of localMutations.entries()) {
        if (fetchedUsers.findIndex(it => it.id === id) === -1) {
          added.push(user);
        }
      }

      if (toRemove) {
        return fetchedUsers.filter(it => it.id !== toRemove.id)
      }

      return added.concat(
        fetchedUsers
          .map((it) => localMutations.has(it.id) ? localMutations.get(it.id)! : it)
      );
    },
    [fetchedUsers, localMutations, toRemove]
  );

  function addNewLocalUserModification(
    next: UserDetails
  ) {
    localMutations.delete(next.id)
    const updated = new Map(localMutations);
    updated.set(next.id, next);
    setLocalMutations(updated);
    setSelectedUser(null)
  }

  function onDelete(
    next: UserDetails
  ) {
    setToRemove(next)
  }

  return (
    <SplitPane
      left={
        <SelectUser
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          onDelete={onDelete}
          users={users}
        />
      }
      right={
        <UserDetailsView
          selectedUser={selectedUser}
          onUserAdded={addNewLocalUserModification}
        />
      }
    />
  )
}