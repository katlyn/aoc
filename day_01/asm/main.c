#include <stdio.h>

extern int star_one (void);
int main () {
    int result = star_one();
    printf("%i", result);
    return 0;
}
